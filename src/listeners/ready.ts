import {Listener, Log} from "@ubccpsc310/bot-base";

const ready: Listener<"ready"> = {
    event: "ready",
    procedure: (): void => {
        Log.info("Bot started 👀");
    }
};

export default ready;
