import { MessageSquarePlus } from "lucide-react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

export const FeedbackButton = () => {
  return (
    <div className="fixed bottom-6 right-6 z-[100]">
      <TooltipProvider delayDuration={300}>
        <Tooltip>
          <TooltipTrigger asChild>
            <a 
              href="https://docs.google.com/forms/d/e/1FAIpQLSf8ZovgP7JX4jj1Q0nRUAUaFWwLPmkdf8wpav3mqKfLFU6T2Q/viewform?usp=dialog"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center w-14 h-14 bg-[#FF6A00] text-white rounded-full shadow-[0_0_20px_-5px_rgba(255,106,0,0.6)] hover:shadow-[0_0_30px_-5px_rgba(255,106,0,0.8)] hover:-translate-y-1 hover:scale-105 transition-all duration-300 ease-out group"
              aria-label="Submit Feedback"
              data-cursor-hover
            >
              <MessageSquarePlus className="w-6 h-6 transition-transform group-hover:scale-110" />
              {/* Optional animated ping effect */}
              <span className="absolute inline-flex w-full h-full rounded-full bg-[#FF6A00] opacity-20 group-hover:animate-ping" />
            </a>
          </TooltipTrigger>
          <TooltipContent side="left" className="bg-[#0A0A0A] border-gray-800 text-gray-200 shadow-xl font-medium px-4 py-2">
            <p>Tell us what to build next!</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </div>
  );
};

export default FeedbackButton;
