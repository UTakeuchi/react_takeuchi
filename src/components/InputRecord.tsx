import { useCallback, type ChangeEvent } from "react";
// import { useForm } from "react-hook-form";
import { Button, FormControl, FormLabel, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Stack, useDisclosure } from "@chakra-ui/react";



type Props = {
    title: string;
    time: string;
    onChangeTitle: (event: ChangeEvent<HTMLInputElement>) => void;
    onChangeTime: (event: ChangeEvent<HTMLInputElement>) => void;
    onClickRegister: (title: string, time: string) => void;
};

// 学習記録入力フォームコンポーネント
export const InputRecord = (props: Props) => {
    const { isOpen, onOpen, onClose } = useDisclosure()
    const { title, time, onChangeTitle, onChangeTime, onClickRegister } = props;
    // const {
    //     register,
    //     handleSubmit,
    //     formState: { errors },
    //     reset,
    // } = useForm<Pick<DataType, "title" | "time">>();
    const onClickNewRegister = useCallback(() => onOpen(), []);

    return (
        <div>
            <Button onClick={onClickNewRegister}>新規登録</Button>
            <Modal isOpen={isOpen} onClose={onClose} autoFocus={false} motionPreset="slideInBottom">
                <ModalOverlay />
                <ModalContent pb={6}>
                    <ModalHeader>学習記録を登録する</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody mx={4}>
                        <Stack spacing={4}>
                            <FormControl>
                                <FormLabel>学習内容</FormLabel>
                                <Input value={title} onChange={onChangeTitle} 
                                />
                            </FormControl>
                            <FormControl>
                                <FormLabel>学習時間(数値のみ)</FormLabel>
                                <Input value={time} onChange={onChangeTime} required/>
                            </FormControl>
                        </Stack>
                    </ModalBody>
                    <ModalFooter>
                        <Button onClick={() => {
                            onClickRegister(title, time);
                            onClose();
                        }}>登録</Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
            <br />

        </div>
    )
}

// // 学習内容のタイトルを管理するState
// const [title, setTitle] = useState("");
// // 学習時間を管理するState
// const [time, setTime] = useState("");

// //タイトル入力フィールドの値が変更された時にStateを更新する関数
// const onChangeTitle = (event: ChangeEvent<HTMLInputElement>) => setTitle(event.target.value);

// // 時間入力フィールドの値が変更された時にStateを更新する関数
// const onChangeTime = (event: ChangeEvent<HTMLInputElement>) => setTime(event.target.value);

// export const InputRecord = (props: Props) => {
//     const { title, time, onChangeTitle, onChangeTime, onClickRegister } = props;
//     const {
//         register,
//         handleSubmit,
//         formState: { errors },
//         reset,
//     } = useForm<Pick<DataType, "title" | "time">>();

//     // const onSubmit = (data: Pick<DataType, "title" | "time">) => {
//     //     console.log(data.title, data.time)
//     //     onClickRegister(data.title, data.time);
//     //     reset(); // 入力後にフォームを初期化
//     // };

//     return (

//         <div>
//             <input
//                 placeholder="学習内容を入力"
//                 value={title}
//                 onChange={onChangeTitle}
//                 {...register("title", { required: "内容の入力は必須です" })}
//             />
//             {errors.title && <p>{errors.title.message}</p>}

//             <input
//                 placeholder="学習時間を入力(数値のみ)"
//                 value={time}
//                 onChange={onChangeTime}
//                 {...register("time", {
//                     required: "時間の入力は必須です",
//                     pattern: {
//                         value: /^[0-9]+$/,
//                         message: "時間は0以上である必要があります",
//                     },
//                 })}
//             />
//             {errors.time && <p>{errors.time.message}</p>}
//             <Button onClick={() => onClickRegister(title, time)}>登録</Button>
//         </div>
//     );
// };
