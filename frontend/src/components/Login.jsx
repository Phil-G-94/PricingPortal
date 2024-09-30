function Login() {
    const loginHandler = (event) => {
        event.preventDefault();
    };

    return (
        <>
            <h2>Log in</h2>
            <form action="/login" onSubmit={loginHandler}>
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

                <button type="submit">Log in</button>
            </form>
        </>
    );
}

export default Login;
