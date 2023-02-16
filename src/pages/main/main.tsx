import {getDocs, collection} from 'firebase/firestore';
import { useEffect, useState } from 'react';
import {db} from '../../config/firebase';
import {Post} from './post';

export interface PostData {
    desc: string;
    id: string;
    title: string;
    username: string
}

export const Main:any = () => {
    const postsRef = collection(db, "posts");

    const [postsList, setPostsList] = useState<PostData[] | null>(null);
    const getPosts = async() => {
        const data = await getDocs(postsRef)
        setPostsList(data.docs.map((doc)=> ({...doc.data(), id: doc.id})) as PostData[]);

    }

    useEffect(()=> {getPosts();}, [])

    return (
        <div> {postsList?.map((post)=> <Post post={post}/>)} </div>
    )
}