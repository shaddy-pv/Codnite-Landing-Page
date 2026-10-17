import { MessageSquarePlus } from "lucide-react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

export const FeedbackButton = () => {
  return (
    <div className="fixed bottom-[calc(1rem+env(safe-area-inset-bottom,0px))] right-3 sm:right-6 sm:bottom-6 z-40">
      <TooltipProvider delayDuration={300}>
        <Tooltip>
          <TooltipTrigger asChild>
            <a 
              href="https://docs.google.com/forms/d/e/1FAIpQLSf8ZovgP7JX4jj1Q0nRUAUaFWwLPmkdf8wpav3mqKfLFU6T2Q/viewform?usp=dialog"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 bg-[#FF6A00] text-white rounded-full shadow-[0_4px_20px_rgba(255,106,0,0.45)] hover:shadow-[0_0_30px_-5px_rgba(255,106,0,0.8)] hover:-translate-y-1 hover:scale-105 active:scale-95 transition-all duration-300 ease-out group"
              aria-label="Submit Feedback"
              data-cursor-hover
            >
              <MessageSquarePlus className="w-4 h-4 sm:w-5 sm:h-5 transition-transform group-hover:scale-110" />
              {/* Optional animated ping effect */}
              <span className="absolute inline-flex w-full h-full rounded-full bg-[#FF6A00] opacity-20 group-hover:animate-ping pointer-events-none" />
            </a>
          </TooltipTrigger>
          <TooltipContent side="left" className="bg-[#0A0A0A] border-zinc-800 text-zinc-200 shadow-xl font-medium px-3.5 py-1.5 text-xs">
            <p>Tell us what to build next!</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </div>
  );
};

export default FeedbackButton;
