import {authApi} from "../repo/samuraiApi";

const Profile = () => {

    console.log("call auth me", authApi.me())

    const logout = () => {
        authApi.logout()
    }

    return <div>

        <button onClick={logout}>Logout</button>
    </div>
}
export default Profile

