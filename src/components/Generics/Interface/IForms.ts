export interface FormProps {
    formData: any;
    isUpdate: boolean;
    handleReloadTable?: () => void;
    onSubmitSuccess?: () => void;
}