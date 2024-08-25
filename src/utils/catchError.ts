export const CatchError = (err: { code?: string }): string => {
    const { code } = err;
    let errorMessage = '';
    switch (code) {
        case "auth/email-already-in-use":
            errorMessage = "An account with this email already exists.";
            break;
        case "auth/weak-password":
            errorMessage = "Password should be at least 6 characters long.";
            break;
        case "auth/invalid-email":
            errorMessage = "Please enter a valid email address.";
            break;
        case "auth/user-not-found":
            errorMessage = "User not found.";
            break;
        case "auth/wrong-password":
            errorMessage = "Wrong password.";
            break;
        case "auth/invalid-credential":
            errorMessage = "Invalid credentials.";
            break;
        case "auth/requires-recent-login":
            errorMessage = "Logout and login before updating your profile.";
            break;
        default:
            errorMessage = "An error occurred during signup. Please try again.";
    }
    console.log(err);
    return errorMessage;
}