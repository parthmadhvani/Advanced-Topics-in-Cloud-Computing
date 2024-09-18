import crypto from 'crypto';
import fetch from 'node-fetch';

const BANNER_ID = "B00981268";
const HASH_TYPE = "md5";
const LAMBDA_ARN = "arn:aws:lambda:us-east-1:633448752051:function:md5";

export const handler = async (event) => {
    const { value, course_uri } = event;

    // Create MD5 hash of the input value
    const hash = crypto.createHash(HASH_TYPE).update(value, 'utf8').digest('hex');

    const result = {
        banner: BANNER_ID,
        result: hash,
        arn: LAMBDA_ARN,
        action: HASH_TYPE,
        value
    };

    try {
        const response = await fetch(course_uri, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(result)
        });

        if (!response.ok) {
            throw new Error(`Failed to post result: ${response.statusText}`);
        }
    } catch (error) {
        console.error('Error posting to course URI:', error);
        throw error; 
    }

    return result;
};
