import { Button, FormControl, FormLabel, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Stack, useDisclosure, Wrap, WrapItem } from "@chakra-ui/react";
import type { DataType } from "../types/todo";
import { useCallback } from "react";


// 学習記録表示コンポーネント
export const StudyRecords = (props: Pick<DataType, "records" | "loading" |"onChangeTitle"|"onChangeTime"|"onClickDelete">) => {
    const { isOpen, onOpen, onClose } = useDisclosure()
    const { records, loading, onChangeTitle, onChangeTime, onClickDelete } = props;
    const onClickEdit = useCallback(() => onOpen(), []);
    
    if (loading) return <p>Loading...</p>

    const totalTime = records.reduce((sum, record) => sum + Number(record.time), 0);
    

    return (
        <Wrap spacing={10}>  
            <div>
                <ul>
                    {records.map((record) => (
                        <WrapItem>
                            <li key={record.id}>
                                <div style={{width: "300px",height:"50px"}}>
                                    <p>{record.title}, {record.time}時間 
                                        <Button onClick={() => onClickEdit()}>編集</Button>
                                         <Modal isOpen={isOpen} onClose={onClose} autoFocus={false} motionPreset="slideInBottom">
                                            <ModalOverlay />
                                            <ModalContent pb={6}>
                                                 <ModalHeader>記録編集</ModalHeader>
                                                            <ModalCloseButton />
                                                            <ModalBody mx={4}>
                                                                <Stack spacing={4}>
                                                                    <FormControl>
                                                                        <FormLabel>学習内容</FormLabel>
                                                                        <Input value={record.title} onChange={onChangeTitle} 
                                                                        />
                                                                    </FormControl>
                                                                    <FormControl>
                                                                        <FormLabel>学習時間(数値のみ)</FormLabel>
                                                                        <Input value={record.time} onChange={onChangeTime} required/>
                                                                    </FormControl>
                                                                </Stack>
                                                            </ModalBody>
                                                            <ModalFooter>
                                                                <Button onClick={() => {
                                                                    // onClickRegister(title, time);
                                                                    onClose();
                                                                }}>登録</Button>
                                                            </ModalFooter>
                                            </ModalContent>
                                        </Modal>
                                        <Button onClick={() => onClickDelete(record.id)}>削除</Button>
                                    </p>
                                </div>
                            </li>
                        </WrapItem>
                    ))}
                </ul>
                <p>勉強合計時間：{totalTime}時間</p>
            </div>

        </Wrap>
    )
}
