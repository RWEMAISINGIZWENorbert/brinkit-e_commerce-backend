interface VerifyEmailTemplateParams {
  name: string;
  url: string;
}

const verifyEmailTemplate = ({ name, url }: VerifyEmailTemplateParams): string => {
  return `
      <p>Dear ${name}</p>
      <p>Thank you for the resend the rin tech.</p>
      <a href="${url}">
        Verify the Email
      </a>
  `;
};

export default verifyEmailTemplate;