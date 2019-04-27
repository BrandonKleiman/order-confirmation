export interface SendgridTemplate {
  to: string;
  from: string;
  templateId: string;
  dynamic_template_data: {
    [key: string]: string;
  };
}
