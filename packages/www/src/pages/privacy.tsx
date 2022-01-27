import React from 'react';
import { Heading, styled } from '@fxtrot/ui';

import { ContentBlock } from '../components/ContentBlock';

const P = styled('p', {
  my: '$4',
});

const Privacy = () => {
  return (
    <ContentBlock>
      <Heading>Privacy Policy for Fluent Translate</Heading>

      <P>
        At Fluent Translate, accessible from
        https://fluent-translate.vercel.app/, one of our main priorities is the
        privacy of our visitors. This Privacy Policy document contains types of
        information that is collected and recorded by Fluent Translate and how
        we use it.
      </P>

      <P>
        If you have additional questions or require more information about our
        Privacy Policy, do not hesitate to contact us.
      </P>

      <P>
        This Privacy Policy applies only to our online activities and is valid
        for visitors to our website with regards to the information that they
        shared and/or collect in Fluent Translate. This policy is not applicable
        to any information collected offline or via channels other than this
        website.
      </P>

      <Heading level={2}>Consent</Heading>

      <P>
        By using our Fluent Translate extension, you hereby consent to our
        Privacy Policy and agree to its terms.
      </P>

      <Heading level={2}>Information we collect</Heading>

      <P>
        The personal information that you are asked to provide, and the reasons
        why you are asked to provide it, will be made clear to you at the point
        we ask you to provide your personal information.
      </P>
      <P>
        If you contact us directly, we may receive additional information about
        you such as your name, email address, phone number, the contents of the
        message and/or attachments you may send us, and any other information
        you may choose to provide.
      </P>

      <Heading level={2}>How we use your information</Heading>

      <P>
        We only use the information passed to the extension directly in order to
        perform main functionality. This includes:
      </P>

      <ul>
        <li>Send entered text to the Translator service</li>
      </ul>

      <Heading level={2}>Advertising Partners Privacy Policies</Heading>

      <P>
        You may consult this list to find the Privacy Policy for each of the
        advertising partners of Fluent Translate.
      </P>

      <P>
        Third-party ad servers or ad networks uses technologies like cookies,
        JavaScript, or Web Beacons that are used in their respective
        advertisements and links that appear on Fluent Translate, which are sent
        directly to users' browser. They automatically receive your IP address
        when this occurs. These technologies are used to measure the
        effectiveness of their advertising campaigns and/or to personalize the
        advertising content that you see on websites that you visit.
      </P>

      <P>
        Note that Fluent Translate has no access to or control over these
        cookies that are used by third-party advertisers.
      </P>

      <Heading level={2}>Third Party Privacy Policies</Heading>

      <P>
        Fluent Translate's Privacy Policy does not apply to other advertisers or
        websites. Thus, we are advising you to consult the respective Privacy
        Policies of these third-party ad servers for more detailed information.
        It may include their practices and instructions about how to opt-out of
        certain options.
      </P>

      <P>
        You can choose to disable cookies through your individual browser
        options. To know more detailed information about cookie management with
        specific web browsers, it can be found at the browsers' respective
        websites.
      </P>

      <Heading level={2}>
        CCPA Privacy Rights (Do Not Sell My Personal Information)
      </Heading>

      <P>
        Under the CCPA, among other rights, California consumers have the right
        to:
      </P>
      <P>
        Request that a business that collects a consumer's personal data
        disclose the categories and specific pieces of personal data that a
        business has collected about consumers.
      </P>
      <P>
        Request that a business delete any personal data about the consumer that
        a business has collected.
      </P>
      <P>
        Request that a business that sells a consumer's personal data, not sell
        the consumer's personal data.
      </P>
      <P>
        If you make a request, we have one month to respond to you. If you would
        like to exercise any of these rights, please contact us.
      </P>

      <Heading level={2}>GDPR Data Protection Rights</Heading>

      <P>
        We would like to make sure you are fully aware of all of your data
        protection rights. Every user is entitled to the following:
      </P>
      <P>
        The right to access – You have the right to request copies of your
        personal data. We may charge you a small fee for this service.
      </P>
      <P>
        The right to rectification – You have the right to request that we
        correct any information you believe is inaccurate. You also have the
        right to request that we complete the information you believe is
        incomplete.
      </P>
      <P>
        The right to erasure – You have the right to request that we erase your
        personal data, under certain conditions.
      </P>
      <P>
        The right to restrict processing – You have the right to request that we
        restrict the processing of your personal data, under certain conditions.
      </P>
      <P>
        The right to object to processing – You have the right to object to our
        processing of your personal data, under certain conditions.
      </P>
      <P>
        The right to data portability – You have the right to request that we
        transfer the data that we have collected to another organization, or
        directly to you, under certain conditions.
      </P>
      <P>
        If you make a request, we have one month to respond to you. If you would
        like to exercise any of these rights, please contact us.
      </P>

      <Heading level={2}>Children's Information</Heading>

      <P>
        Another part of our priority is adding protection for children while
        using the internet. We encourage parents and guardians to observe,
        participate in, and/or monitor and guide their online activity.
      </P>

      <P>
        Fluent Translate does not knowingly collect any Personal Identifiable
        Information from children under the age of 13. If you think that your
        child provided this kind of information on our website, we strongly
        encourage you to contact us immediately and we will do our best efforts
        to promptly remove such information from our records.
      </P>
    </ContentBlock>
  );
};

export default Privacy;
