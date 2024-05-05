import React from "react";
import "./styles/signin.css";

function Signin() {
    return (
        <div id="signup">
            <h2>Create Account</h2>
            <form>
                <table>
                    <tr>
                        <td>
                            <label htmlFor="email">Email:</label>
                        </td>
                        <td>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                required
                                placeholder="Enter your email address"
                            />
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <label htmlFor="password">Password:</label>
                        </td>
                        <td>
                            <input
                                type="password"
                                id="password"
                                name="password"
                                required
                                placeholder="Enter your password"
                            />
                        </td>
                    </tr>
                </table>
                <button type="submit">Create Account</button>
            </form>
        </div>
    );
}

export default Signin;
