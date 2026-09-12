import { Colors2023 } from '@nextnexus/styles';
import { HackformQuestion } from '@nextnexus/types';
import { H1, H3, H4 } from '@nextnexus/ui';
import styled from 'styled-components';
import { SpanRed } from '../../red-span';

interface HackformQuestionHeaderProps {
  question: HackformQuestion;
  qi: number;
}

export const HackformQuestionHeader = ({
  question,
  qi,
}: HackformQuestionHeaderProps) => {
  return (
    <Wrapper>
      <H1>
        {(qi + 1).toLocaleString('en-US', {
          minimumIntegerDigits: 2,
        })}
      </H1>
      <H3>
        {question.title}
        {question.required && <SpanRed>*</SpanRed>}
      </H3>
      <H4 style={{ color: Colors2023.GRAY.SHLIGHT }}>{question.subtitle}</H4>
    </Wrapper>
  );
};

export default HackformQuestionHeader;

const Wrapper = styled.div`
  color: ${Colors2023.GRAY.LIGHT};
  max-width: 100rem;
`;
