export interface ContactUsFormModel {
  name: string;
  email: string;
  phone: string;
  comments: string;
}

export interface ContactUsResponse {
  message: string;
}

export interface ConfirmDialogModel {
  header: string;
  message: string;
}
