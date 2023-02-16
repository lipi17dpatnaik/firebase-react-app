import {useForm} from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import {addDoc, collection} from 'firebase/firestore';
import {db, auth} from '../../config/firebase';
import { useAuthState } from 'react-firebase-hooks/auth'; // to get the state of current user
import {useNavigate} from 'react-router-dom';

interface CreateFormData {
    title: string;
    desc: string;
}

// use yup schema, yupResolver from hookform/resolvers to communicate to useForm of react-hook-form
export const CreateForm = () => {
    const navigate = useNavigate();

    const schema = yup.object().shape(
        {
            title: yup.string().required("You must add a title."),
            desc: yup.string().required("You must add a desc."),

        }
    )

    const {register, handleSubmit, formState: {errors}} = useForm<CreateFormData>(
        {
           resolver: yupResolver(schema)
        }
    )

    const postsRef = collection(db, "posts");

    const [user] = useAuthState(auth)

    const onCreatePost = async (data: CreateFormData) => {
        await addDoc(postsRef,
            {
                title: data.title,
                desc:data.desc,
                // can also write the above like ...data, (destructuring)
                username: user?.displayName,
                id: user?.uid
            }
        )
        navigate("/")
    }

    return (
    <form onSubmit={handleSubmit(onCreatePost)} className="form">
        <input className="input" placeholder="Title.." {...register("title")}/>
        <p className="errors">{errors?.title?.message}</p>
        <textarea className="input" placeholder="Desc.." {...register("desc")}/>
        <p className="errors">{errors?.desc?.message}</p>
        <input className="submit" type="submit"/>
    </form>
    )
}