function Home() {
    return (
        <>
            <h1 className="text-4xl font-bold text-center text-gray-800 mt-12 mb-8">
                Pricing Tool
            </h1>
            <article className="max-w-2xl mx-auto px-4 space-y-12">
                <section className="space-y-4 text-center bg-white shadow-md p-6 rounded-2xl">
                    <h2 className="text-2xl font-semibold text-gray-700">
                        What am I?
                    </h2>
                    <div className="space-y-3 text-gray-600 leading-relaxed">
                        <p className="text-left">
                            I am a pricing tool for bespoke server hardware used to
                            power a virtualisation platform.
                        </p>
                        <p className="text-left">
                            Before I was created, sales engineers at a certain
                            company had to work with spreadsheets to create quotes.
                        </p>
                        <p className="text-left">
                            Now they can do so using a much friendlier UI that also
                            allows them to view, edit or delete any created quotes
                            within a single pane of glass.
                        </p>
                    </div>
                </section>

                <section className="space-y-4 text-center bg-white shadow-md p-6 rounded-2xl">
                    <h2 className="text-2xl font-semibold text-gray-700">
                        How do I get started?
                    </h2>
                    <div className="space-y-3 text-gray-600 leading-relaxed">
                        <p className="text-left">
                            You&apos;ll need to sign up if you don&apos;t have a
                            registered account.
                        </p>
                        <p className="text-left">
                            Don&apos;t worry, proper validation isn&apos;t in place
                            at the moment so you can simply make up an email — just
                            make sure there&apos;s an @.
                        </p>
                        <p className="text-left">
                            I&apos;ll hash your password so it can&apos;t be viewed
                            but please make sure it&apos;s not a password you
                            actually use for something.
                        </p>
                        <p className="text-left">
                            Once you&apos;ve created an account, sign in using your
                            credentials to access the Quote Tool page — this is where
                            the magic happens!
                        </p>
                    </div>
                </section>
            </article>
        </>
    );
}
export default Home;
