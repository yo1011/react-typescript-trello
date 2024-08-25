import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "./Firebase";
import { toastErr } from "../utils/toast";
import { CatchError } from "../utils/catchError";
import { authDataType, setLoadingType, userType } from "../Types";
import { NavigateFunction } from "react-router-dom";
import { doc, getDoc, serverTimestamp, setDoc, updateDoc } from "firebase/firestore";
import { defaultUser, setUser } from "../Redux/userSlice";
import { AppDispatch } from "../Redux/store";
import ConvertTime from "../utils/ConvertTime";
import AvatarGenerator from "../utils/avatarGenerator";

const usersColl = "users";
const tasksColl = "tasks";
const taskListColl = "taskList";
const chatsColl = "chats";
const messagesColl = "messages";

export const BE_signUp = (
    data: authDataType,
    setLoading: setLoadingType,
    reset: () => void,
    goTo: NavigateFunction,
    dispatch: AppDispatch,
) => {
    const { email, password, confirmPassword } = data;

    setLoading(true);

    if (email && password) {
        if (password === confirmPassword) {
            createUserWithEmailAndPassword(auth, email, password)
                .then(async (userCredential) => {
                    const { user } = userCredential;

                    // generate user avatar with username
                    const imgLink = AvatarGenerator(user.email?.split('@')[0]);

                    const userInfo = await addUserToCollection(
                        user.uid,
                        user.email || "",
                        user.email?.split('@')[0] || "",
                        imgLink
                    );

                    //TODO: set userinfo to store and local storage

                    dispatch(setUser(userInfo));

                    console.log(user, 'user----user');
                    setLoading(false);
                    reset();
                    goTo("/dashboard");
                })
                .catch(err => {
                    toastErr(CatchError(err))
                    setLoading(false);
                })
        } else {
            toastErr(`Password and confirm password should be same!`);
            setLoading(false);
        }
    } else {
        toastErr(`Field shouldn't be empty`);
        setLoading(false);
    }
}

export const BE_signIn = (
    data: authDataType,
    setLoading: setLoadingType,
    reset: () => void,
    goTo: NavigateFunction,
    dispatch: AppDispatch,
) => {
    const { email, password } = data;

    setLoading(true);

    if (email && password) {
        signInWithEmailAndPassword(auth, email, password)
            .then(async (userCredential) => {
                const { user } = userCredential;
                console.log(user, 'usrurs');
                //TODO: update user isOnline true 
                await updateUserInfo({ id: user.uid, isOnline: true });

                const userInfo = await getUserInfo(user.uid);

                //TODO: set userinfo to store and local storage
                dispatch(setUser(userInfo));

                setLoading(false);
                reset();
                goTo("/dashboard");
            })
            .catch((err) => {
                toastErr(CatchError(err))
                setLoading(false);
            });
    } else {
        toastErr(`Field shouldn't be empty`);
        setLoading(false);
    }
}

const addUserToCollection = async (
    id: string,
    email: string,
    username: string,
    img: string
) => {
    await setDoc(doc(db, usersColl, id), {
        isOnline: true,
        img,
        username,
        email,
        creationTime: serverTimestamp(),
        lastSeen: serverTimestamp(),
        bio: `Hi! my name is ${username}, thanks to you I understant React and Typescript now, and I'm comfortable working with them.`
    })

    return getUserInfo(id);
}

const getUserInfo = async (id: string): Promise<userType> => {
    const docRef = doc(db, usersColl, id);
    const user = await getDoc(docRef);

    if (user.exists()) {
        const { email, isOnline, username, img, bio, creationTime, lastSeen } = user.data();

        return {
            id: user.id,
            img,
            email,
            isOnline,
            username,
            bio,
            creationTime: creationTime ? ConvertTime(creationTime.toDate()) : "no date yet: userInfo",
            lastSeen: lastSeen ? ConvertTime(lastSeen.toDate()) : "no date yet: userInfo",
        };
    } else {
        toastErr("getUserInfo: user not found!")
        return defaultUser;
    }
}

const updateUserInfo = async (
    {
        id,
        username,
        image,
        isOnline,
        isOffline
    }: {
        id?: string;
        username?: string;
        image?: string;
        isOnline?: boolean;
        isOffline?: boolean;
    }
) => {
    if (!id) {
        id = getStorageUser().id;
    }

    if (id) {
        await updateDoc(
            doc(db, usersColl, id), {
            ...(username && { username }),
            ...(image && { image }),
            ...(isOnline && { isOnline }),
            ...(isOffline && { isOnline: false }),
            lastSeen: serverTimestamp(),

        }
        );
    }
}

const getStorageUser = () => {
    const usr = localStorage.getItem("current_user");
    if (usr) {
        return JSON.parse(usr);
    }
    return null;
}
