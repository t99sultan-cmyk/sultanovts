"use client";
import React, { useEffect } from "react";

export default function ElevenLabsWidget() {
  useEffect(() => {
    // Inject the script only once
    if (!document.querySelector('script[src="https://unpkg.com/@elevenlabs/convai-widget-embed"]')) {
      const script = document.createElement("script");
      script.src = "https://unpkg.com/@elevenlabs/convai-widget-embed";
      script.async = true;
      script.type = "text/javascript";
      document.body.appendChild(script);
    }
  }, []);

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: `
        /* Overriding Widget Styles to flawlessly match the Site's Premium Dark/Orange theme */
        elevenlabs-convai {
          z-index: 99998;
        }

        /* The expanded preview card shown before starting */
        elevenlabs-convai::part(call-card) {
          background: rgba(10, 13, 20, 0.95) !important;
          backdrop-filter: blur(20px) !important;
          border: 1px solid rgba(249, 115, 22, 0.3) !important;
          border-radius: 20px !important;
          box-shadow: 0 15px 40px rgba(0,0,0,0.6), 0 0 15px rgba(249, 115, 22, 0.1) !important;
          color: white !important;
          padding: 16px !important;
          transition: all 0.3s ease !important;
        }

        elevenlabs-convai::part(call-card):hover {
          border-color: rgba(249, 115, 22, 0.6) !important;
          box-shadow: 0 15px 40px rgba(0,0,0,0.6), 0 0 25px rgba(249, 115, 22, 0.2) !important;
          transform: translateY(-2px) !important;
        }

        /* Apply styling to text inside the card */
        elevenlabs-convai::part(title) { color: white !important; font-weight: 900 !important; font-size: 14px !important; }
        elevenlabs-convai::part(description), elevenlabs-convai::part(subtitle) { color: #9ca3af !important; font-size: 13px !important; }
        
        elevenlabs-convai::part(avatar) {
          border: 2px solid rgba(249, 115, 22, 0.7) !important;
          box-shadow: 0 0 15px rgba(249, 115, 22, 0.3) !important;
          border-radius: 50% !important;
        }

        /* The main "Start a call" or generic UI button */
        elevenlabs-convai::part(button) {
          background: linear-gradient(135deg, #f97316 0%, #ea580c 100%) !important;
          border-radius: 12px !important;
          color: white !important;
          font-weight: 800 !important;
          box-shadow: 0 0 15px rgba(249, 115, 22, 0.3) !important;
          border: 1px solid rgba(255, 255, 255, 0.1) !important;
          text-transform: uppercase !important;
          letter-spacing: 0.5px !important;
          transition: all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275) !important;
        }

        elevenlabs-convai::part(button):hover {
          transform: scale(1.05) !important;
          box-shadow: 0 0 25px rgba(249, 115, 22, 0.5) !important;
        }
        
        /* The main interaction Modal (when talking) */
        elevenlabs-convai::part(modal) {
          background: rgba(10, 13, 20, 0.98) !important;
          backdrop-filter: blur(20px) !important;
          border: 1px solid rgba(249, 115, 22, 0.25) !important;
          box-shadow: 0 30px 60px rgba(0,0,0,0.8), 0 0 40px rgba(249, 115, 22, 0.15) !important;
          border-radius: 24px !important;
        }

        elevenlabs-convai::part(header) {
          background: transparent !important;
          border-bottom: 1px solid rgba(255,255,255,0.05) !important;
          color: white !important;
        }
        
        elevenlabs-convai::part(footer) {
          background: rgba(0,0,0,0.2) !important;
          border-top: 1px solid rgba(255,255,255,0.05) !important;
        }

        /* Mobile specific fixes */
        @media screen and (max-width: 768px) {
          elevenlabs-convai::part(modal) {
            width: 92vw !important;
            height: 60vh !important;
            max-width: 92vw !important;
            max-height: 60vh !important;
            border-radius: 20px !important;
            margin: 0 !important;
            bottom: 20px !important;
            right: 4vw !important;
          }
        }
      `}} />
      
      {/* We only render the standard widget. It will take its custom dashboard config 
          (like the "Персональный помощник" card) and overlay it with our Dark/Orange ::part styles! */}
      <div dangerouslySetInnerHTML={{ __html: '<elevenlabs-convai agent-id="agent_3501kmp2crhafk7bg9pv48n1wf35"></elevenlabs-convai>' }} />
    </>
  );
}
