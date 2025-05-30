export type DataType = {
  id: string;
  title: string;
  time: string;
  onChangeTitle: any;
  onChangeTime: any;
  onClickEdit: any;
  onClickRegister: any;
  records: Array<any>;
  loading: any;
  onClickDelete: any;
};

export type RecordType = { id: string; title: string; time: string };
