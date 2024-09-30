function Signup() {
    const signupHandler = async () => {
        event.preventDefault();
    };

    return (
        <>
            <h2>Sign up</h2>
            <form action="/signup" onSubmit={signupHandler}>
                <label htmlFor="email">
                    <input
                        type="email"
                        name="email"
                        id="email"
                        placeholder="email..."
                    />
                </label>

                <label htmlFor="password">
                    <input
                        type="password"
                        name="password"
                        id="password"
                        placeholder="password..."
                    />
                </label>

                <button type="submit">Sign up</button>
            </form>
        </>
    );
}

export default Signup;
