import {
  Button,
  FormControl,
  FormLabel,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Stack,
  useDisclosure,
  //   Wrap,
  //   WrapItem,
} from "@chakra-ui/react";
import type { DataType, RecordType } from "../types/todo";
import {
  useCallback,
  useState,
  type ChangeEvent,
  type MouseEventHandler,
} from "react";

// 学習記録表示コンポーネント
export const StudyRecords = (
  props: Pick<
    DataType,
    | "records"
    | "loading"
    | "onChangeTitle"
    | "onChangeTime"
    | "onClickEdit"
    | "onClickDelete"
  >
) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const {
    records,
    loading,
    // onChangeTitle,
    // onChangeTime,
    onClickEdit,
    onClickDelete,
  } = props;
  const [selectedRecord, setSelectedRecord] = useState<{
    id: string;
    title: string;
    time: string;
  } | null>(null);

  const onClickEditModal = useCallback(
    (record: RecordType) => {
      setSelectedRecord(record);
      onOpen();
    },
    [onOpen]
  );

  const handleEdit = (selectedRecord: RecordType) => {
    if (selectedRecord) {
      onClickEdit(selectedRecord);
      onClose();
    }
  };
  if (loading) return <p>Loading...</p>;

  const totalTime = records.reduce(
    (sum, record) => sum + Number(record.time),
    0
  );

  return (
    <>
      <div>
        <ul>
          {records.map((record) => (
            // <WrapItem>
            <li key={record.id}>
              <div style={{ width: "300px", height: "50px" }}>
                <p>
                  {record.title}, {record.time}時間
                  <Button onClick={() => onClickEditModal(record)}>編集</Button>
                  <Button onClick={() => onClickDelete(record.id)}>削除</Button>
                </p>
              </div>
            </li>
            // </WrapItem>
          ))}
          ;
        </ul>
        <p>勉強合計時間：{totalTime}時間</p>
      </div>
      <Modal
        isOpen={isOpen}
        onClose={onClose}
        autoFocus={false}
        motionPreset="slideInBottom"
      >
        <ModalOverlay />
        <ModalContent pb={6}>
          <ModalHeader>記録編集</ModalHeader>
          <ModalCloseButton />
          <ModalBody mx={4}>
            <Stack spacing={4}>
              <FormControl>
                <FormLabel>学習内容</FormLabel>
                <Input
                  value={selectedRecord?.title || ""}
                  onChange={(e: ChangeEvent<HTMLInputElement>) =>
                    setSelectedRecord((prev) =>
                      prev ? { ...prev, title: e.target.value } : null
                    )
                  }
                />
              </FormControl>
              <FormControl>
                <FormLabel>学習時間(数値のみ)</FormLabel>
                <Input
                  value={selectedRecord?.time ?? ""}
                  onChange={(e: ChangeEvent<HTMLInputElement>) =>
                    setSelectedRecord((prev) =>
                      prev ? { ...prev, time: e.target.value } : null
                    )
                  }
                />
              </FormControl>
            </Stack>
          </ModalBody>
          <ModalFooter>
            <Button
              onClick={() => {
                onClickEdit(selectedRecord);
                onClose();
              }}
            >
              登録
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};
