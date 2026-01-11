import { ZapIcon } from "lucide-react";
import React from "react";

function RateLimited() {
  return (
    <div className="flex items-center justify-center min-h-[70vh] px-4">
      <div className="alert alert-warning shadow-lg max-w-lg">
        <ZapIcon className="h-6 w-6" />

        <div>
          <h3 className="font-bold text-lg">
            Rate Limit Reached
          </h3>
          <p className="text-sm opacity-90">
            You have made too many requests in a short period.
          </p>
          <p className="text-sm opacity-90">
            Please wait a few seconds and try again.
          </p>
        </div>
      </div>
    </div>
  );
}

export default RateLimited;
