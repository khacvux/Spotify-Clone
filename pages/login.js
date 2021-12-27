import { getProviders, signIn } from "next-auth/react";

function Login({ providers }) {
    
    return (
        <div className="flex flex-col justify-center items-center h-screen w-full bg-black">
            {Object.values(providers).map((provider) => (
                <div key={provider.name}>
                    <button className=" px-5 py-3 text-white bg-[#16be56] rounded-full hover:bg-[#64D862]"
                        onClick={() => signIn(provider.id, { callbackUrl: "/" })}
                    >
                        Login with {provider.name}
                    </button>
                </div>
            ))}
        </div>
    )
}

export default Login;

export async function getServerSideProps() {
    return {
        props: {
            providers: await getProviders(),
        },
    };
}