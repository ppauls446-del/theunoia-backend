
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";
import { createHmac } from "https://deno.land/std@0.168.0/crypto/mod.ts";

const corsHeaders = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

serve(async (req) => {
    if (req.method === "OPTIONS") {
        return new Response("ok", { headers: corsHeaders });
    }

    try {
        const { razorpay_order_id, razorpay_payment_id, razorpay_signature, projectId } = await req.json();

        if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature) {
            throw new Error("Missing payment verification details");
        }

        const key_secret = Deno.env.get("RAZORPAY_KEY_SECRET") ?? "";

        // Verify signature
        const text = razorpay_order_id + "|" + razorpay_payment_id;
        const hmac = createHmac("sha256", new TextEncoder().encode(key_secret));
        hmac.update(new TextEncoder().encode(text));
        const generated_signature = hmac.toString();

        if (generated_signature !== razorpay_signature) {
            throw new Error("Invalid payment signature");
        }

        // Initialize Supabase client
        const supabaseUrl = Deno.env.get("SUPABASE_URL") ?? "";
        const supabaseServiceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? "";
        const supabase = createClient(supabaseUrl, supabaseServiceKey);

        // 1. Log payment record securely
        const { error: paymentError } = await supabase
            .from("payments")
            .upsert({
                razorpay_order_id: razorpay_order_id,
                razorpay_payment_id: razorpay_payment_id,
                project_id: projectId, // Link project if provided
                status: "captured",
                updated_at: new Date().toISOString(),
            }, { onConflict: 'razorpay_order_id' });

        if (paymentError) {
            console.error("Error logging payment record:", paymentError);
        }

        // 2. Automate Project Completion!
        if (projectId) {
            console.log(`Marking project ${projectId} as completed after payment verification...`);
            const { error: projectError } = await supabase
                .from("user_projects")
                .update({
                    status: 'completed',
                    completed_at: new Date().toISOString()
                })
                .eq("id", projectId);

            if (projectError) {
                console.error("Error updating project status to completed:", projectError);
                // We return failure if project update fails to ensure consistency
                throw new Error("Payment verified but failed to update project status");
            }
        }

        return new Response(
            JSON.stringify({ success: true, verified: true }),
            {
                headers: { ...corsHeaders, "Content-Type": "application/json" },
                status: 200,
            }
        );

    } catch (error) {
        return new Response(
            JSON.stringify({ error: error.message }),
            {
                headers: { ...corsHeaders, "Content-Type": "application/json" },
                status: 400,
            }
        );
    }
});
