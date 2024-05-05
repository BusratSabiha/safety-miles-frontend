// import React from "react";
// import { Link } from "react-router-dom";

// import "./styles/signin.css";
// import "./Signin";

// function LogIn() {

//     return (
//         <p>Already an user?
//             <link to="/Signin">Sign In

//             </link>
//         </p>


//     );



// }

// export default LogIn

import React from "react";
import { Link } from "react-router-dom"; // Import the Link component
import "./styles/signin.css"; // Import your styles
import Signin from "./Signin"; // Import the Signin component (if needed)
import Signup from "./Signup";

function LogIn() {
    return (
        <>
            <p>
                Already a user?{" "}
                <Link to="/Signin">Sign In</Link> {/* Use the Link component */}
            </p>
            <p>
                Don't have an account?{" "}
                <Link to="/Signup">Create Account</Link> {/* Use the Link component */}
            </p>
        </>
    );
}

export default LogIn;
