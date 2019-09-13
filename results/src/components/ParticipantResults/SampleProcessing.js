import React from 'react';
import { Feature, FeatureH3, Br, UnorderedList } from '../styledComponents';

export default function SampleProcessing(props) {
    return (
        <div>
            <Feature title="Your sample has been received and we are processing it!"
                buttonLink="/current"
                buttonText="Current Conditions">
                <P>
                    Check back in a few days to see your results!
                    <Br/>
                    In the meantime, checkout out the current flu conditions:
                </P>
            </Feature>
            <Feature title='What does "processing" mean?'>
                <P>
                    The sample is in the lab and being prepared for presence/absence testing.<br/>
                    What else do we want to add here?
                </P>
            </Feature>
        </div>
    )
}
