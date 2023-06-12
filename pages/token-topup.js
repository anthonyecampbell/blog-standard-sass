import { withPageAuthRequired } from "@auth0/nextjs-auth0";
import { AppLayout } from "../components/AppLayout";
import { getAppProps } from "../utils/getAppProps";

export default function TokenTopup() {
  const handleClick = async () => {
    const result = await fetch(`/api/addTokens`, {
      method: "POST",
    });
    const json = await result.json();
    console.log("RESULT", json);
    window.location.href = json.session.url;
  };
  return (
    <div>
      <div className="overflow-auto h-full">
        <div className="max-w-screen-sm mx-auto">
          <div className="p-4 my-2 border border-stone-200 rounded-md">
            <div className="text-blue-600 text-2xl font-bold">
              Add tokens to your account
            </div>
            <div className="mt-2">
              <p>
                By pressing the "Add Tokens" button below you agree to thge
                terms and conditions of BlogStandard.
              </p>
            </div>
            <button className="btn" onClick={handleClick}>
              Add tokens
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

TokenTopup.getLayout = function getLayout(page, pageProps) {
  return <AppLayout {...pageProps}>{page}</AppLayout>;
};

export const getServerSideProps = withPageAuthRequired({
  async getServerSideProps(ctx) {
    const props = await getAppProps(ctx);
    return {
      props,
    };
  },
});
