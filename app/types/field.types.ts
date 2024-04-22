
type FormControlType =
    | "button"
    | "checkbox"
    | "color"
    | "date"
    | "datetime-local"
    | "email"
    | "file"
    | "hidden"
    | "image"
    | "month"
    | "number"
    | "password"
    | "radio"
    | "range"
    | "reset"
    | "search"
    | "submit"
    | "tel"
    | "text"
    | "time"
    | "url"
    | "week"
    | "multiple"
    | "select"
    | "multi-select"
    | 'textarea'

type FileAcceptType =
    | "image/*"
    | "video/*"
    | "audio/*"
    | ".pdf"
    | ".doc"
    | ".docx"
    | ".xlsx"
    | ".xls";

export interface IOption {
    value: string;
    label: string;
    disable?: boolean;
    /** fixed option that can't be removed. */
    fixed?: boolean;
    /** Group the options by providing key. */
    [key: string]: string | boolean | undefined;
}

type FormFieldCommon<TFlat> = {
    id: keyof TFlat;
    placeholder: string;
    label: string;
    required: boolean;
    max?: number
}

type DefaultField<TFlat> = FormFieldCommon<TFlat> & {
    type: Exclude<FormControlType, "file" | "multiple" | 'select' | 'multi-select'>;
};

type SelectFormField<TFlat> = FormFieldCommon<TFlat> & {
    type: 'select' | 'multi-select';
    options: Array<IOption>;
};

type MultipleStringField<TFlat> = FormFieldCommon<TFlat> & {
    type: "multiple";
    existingList?: Array<string>
};

type FileFormField<TFlat> = FormFieldCommon<TFlat> & {
    type: "file";
    accept: Array<FileAcceptType>;
    existingMedia: Array<string>
};

export type TFormField<TFlat> =
    | DefaultField<TFlat>
    | FileFormField<TFlat>
    | MultipleStringField<TFlat>
    | SelectFormField<TFlat>;

