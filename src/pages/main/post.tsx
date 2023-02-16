import { addDoc, deleteDoc, collection, getDocs, query, where, doc } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { db, auth } from '../../config/firebase';

import { PostData } from "./main"
interface Props {
    post: PostData;
}

interface Likes {
    likeId: string;
    userId: string;
}

export const Post = (props: Props) => {
    const { post } = props;
    const [user] = useAuthState(auth);

    const [likeNum, setLikeNum] = useState<number | null>(null);

    const [likes, setLikes] = useState<Likes[] | null>(null);

    const likesRef = collection(db, "likes");

    const likesDoc = query(likesRef, where("postId", "==", post.id));
    const deleteDocs = query(likesRef, where("postId", "==", post.id), where("userId", "==", user?.uid));

    const addLike = async () => {
        try {
            console.log('add function');
           const newDoc = await addDoc(
                likesRef, { userId: user?.uid, postId: post.id }
            );
            if (user) {
                setLikes((prev) =>
                    prev ? [...prev, { userId: user.uid, likeId: newDoc.id }] : [{ userId: user.uid, likeId: newDoc.id }]);
            }
        }
        catch (err) {
            console.log('error at addLike function');
        }
    }

    const removeLike = async () => {
        try {
            console.log('remove function');
            const data = await getDocs(deleteDocs);
            await deleteDoc(
                doc(db, "likes", data.docs[0].id)
            );
            if (user) {
                setLikes((prev) => prev? prev.filter((like)=> {return like.likeId !== data.docs[0].id}): []);
            }
        }
        catch (err) {
            console.log('error at addLike function');
        }
    }

    const getLikeNum = async () => {
        const data = await getDocs(likesDoc)
        setLikeNum(data.docs.length);
    };

    const getLikes = async () => {
        const data = await getDocs(likesDoc)
        setLikes(data.docs.map((doc) => ({ userId: doc.data().userId, likeId: doc.id })));
    };

    const hasCurrentUserLiked = likes?.find((like) => { return like.userId == user?.uid });

    useEffect(() => { getLikeNum() }, []);

    return (
        <div className="post">
            <div className="title"> <h1> {post.title} </h1></div>
            <div className="footer"> {post.desc}</div>
            <div className="body">
                <p>@{post.username}</p>
                <button onClick={hasCurrentUserLiked ? removeLike : addLike}> {hasCurrentUserLiked ? <> &#128077; </> : <> &#128078; </>} </button>
                <p>Likes: {likeNum}</p>
            </div>
        </div>
    )
}