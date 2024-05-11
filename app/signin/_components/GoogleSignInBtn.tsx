import { GoogleSignIn } from "@/actions/auth";
import { Google } from "@/assets/svgs/Google";
import { Button } from "@/components/ui/button";

const GoogleSignInBtn = () => {
  return (
    <div className="flex justify-center">
      <Button
        formAction={GoogleSignIn}
        variant={"ghost"}
        className="border border-input flex items-center gap-x-5 font-semibold"
      >
        <Google />
        Sign In with Google
      </Button>
    </div>
  );
};

export default GoogleSignInBtn;
