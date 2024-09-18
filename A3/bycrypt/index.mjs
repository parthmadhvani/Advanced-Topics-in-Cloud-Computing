import bcrypt from 'bcryptjs'
import fetch from 'node-fetch';

export const handler = async (event) => {
    const input = event.value;
    const hash = await bcrypt.hash(input, 12);
    
    const result = {
        banner: "B00981268",
        result: hash,
        arn: "arn:aws:lambda:us-east-1:633448752051:function:bcrypt",
        action: "bcrypt",
        value: input
    };

    await fetch(input.course_uri, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(result)
    });

    return result;
};
