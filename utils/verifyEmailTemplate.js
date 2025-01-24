const verifyEmailTeplate = ({ name, url} ) => {
    return `
        <p>Dear  ${name}</p>
        <p>Thabk you fior the resend the rin tech.</p>
        <a href = ${url}>
          verify the Email
        </a>
     `
}

export default verifyEmailTeplate