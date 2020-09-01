export default function useAuth() {
    let token = localStorage.getItem("user");
    if (typeof token === "string") {
        console.log("typeof is true")
        let role = (JSON.parse(token).role)
        console.log(role)
        switch (role) {
            case "[admin]": return true;
            case "[approved user]": return true;
        }
    }
    return false;
}
