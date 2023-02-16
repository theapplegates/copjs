import { BiLeftArrowAlt, BiRightArrowAlt } from 'react-icons/bi';

import Alert from '@/components/atoms/alerts/Alert';
import Button from '@/components/atoms/buttons/Button';
import ThemeToggler from '@/components/atoms/buttons/ThemeToggler';
import Card from '@/components/atoms/cards/Card';
import InputText from '@/components/atoms/inputs/InputText';
import H1 from '@/components/atoms/typography/headings/H1';
import H2 from '@/components/atoms/typography/headings/H2';
import H3 from '@/components/atoms/typography/headings/H3';
import H4 from '@/components/atoms/typography/headings/H4';
import Link from '@/components/atoms/typography/Link';
import Subtitle from '@/components/atoms/typography/Subtitle';
import Title from '@/components/atoms/typography/Title';
import Footer from '@/components/layouts/Footer';
import LoadingSpinner from '@/components/loading/LoadingSpinner';

export default function Index() {
  return (
    <>
      <div className="dark:(bg-ebony text-white) bg-blue-50">
        <div className="py-12 px-4">
          <div className="flex h-full w-full items-center justify-center">
            <div>
              <H1 className="mb-3">Components</H1>

              <div className="mx-auto mb-3 w-full min-w-[300px] max-w-[600px]">
                <H2 className="mb-2">Typography</H2>
                <H1>Heading 1</H1>
                <H2>Heading 2</H2>
                <H3>Heading 3</H3>
                <H4>Heading 4</H4>

                <Title>Title</Title>
                <Subtitle>Subtitle</Subtitle>

                <Link href="#">Link</Link>
              </div>

              <div className="mx-auto mb-3 w-full min-w-[300px] max-w-[600px]">
                <H2 className="mb-2">Alert</H2>
                <Alert color="danger">Danger Alert</Alert>
                <Alert color="warning">Warning Alert</Alert>
                <Alert color="success">Success Alert</Alert>
                <Alert color="info">Info Alert</Alert>
                <Alert color="primary">Primary Alert</Alert>
                <Alert color="secondary">Secondary Alert</Alert>
              </div>

              <div className="mx-auto mb-3 w-full min-w-[300px] max-w-[600px]">
                <H2 className="mb-2">Theme Toggler</H2>
                <div className="mb-3 w-full">
                  <ThemeToggler />
                </div>

                <H2 className="mb-2">Button</H2>
                <div className="mb-3 grid w-full grid-cols-2 gap-2">
                  <Button isLoading={true}>Loading</Button>
                  <Button color="cornflower-blue">Discord</Button>
                  <Button color="primary">Primary</Button>
                  <Button color="secondary">Secondary</Button>
                </div>

                <H2 className="mb-2">Button with left icon</H2>
                <div className="mb-3 grid w-full grid-cols-2 gap-2">
                  <Button color="cornflower-blue" leftIcon={<BiLeftArrowAlt />}>
                    Discord
                  </Button>
                  <Button color="primary" leftIcon={<BiLeftArrowAlt />}>
                    Primary
                  </Button>
                  <Button color="secondary" leftIcon={<BiLeftArrowAlt />}>
                    Secondary
                  </Button>
                </div>

                <H2 className="mb-2">Button with right icon</H2>
                <div className="mb-3 grid w-full grid-cols-2 gap-2">
                  <Button
                    color="cornflower-blue"
                    rightIcon={<BiRightArrowAlt />}
                  >
                    Discord
                  </Button>
                  <Button color="primary" rightIcon={<BiRightArrowAlt />}>
                    Primary
                  </Button>
                  <Button color="secondary" rightIcon={<BiRightArrowAlt />}>
                    Secondary
                  </Button>
                </div>

                <H2 className="mb-2">Button disabled</H2>
                <div className="mb-3 grid w-full grid-cols-2 gap-2">
                  <Button color="cornflower-blue" disabled={true}>
                    Discord
                  </Button>
                  <Button color="primary" disabled={true}>
                    Primary
                  </Button>
                  <Button color="secondary" disabled={true}>
                    Secondary
                  </Button>
                </div>
              </div>

              <div className="mx-auto mb-3 w-full min-w-[300px] max-w-[600px]">
                <H2 className="mb-2">Input Text</H2>
                <div className="grid w-full grid-cols-2 gap-2">
                  <InputText placeholder="Placeholder" />
                  <InputText
                    placeholder="Floating Label"
                    floatingLabel={true}
                  />
                </div>
              </div>

              <div className="mx-auto mb-3 w-full min-w-[300px] max-w-[600px]">
                <H2 className="mb-2">Card</H2>
                <div className="grid w-full grid-cols-2 gap-2">
                  <Card>Some text</Card>
                  <Card>
                    <Title>Title</Title>
                    <Subtitle>Subtitle</Subtitle>
                    <p>Some text</p>
                  </Card>
                </div>
              </div>

              <div className="mx-auto mb-3 w-full min-w-[300px] max-w-[600px]">
                <H2 className="mb-2">Card</H2>
                <div className="grid w-full grid-cols-2 gap-2">
                  <Card>Some text</Card>
                  <Card>
                    <Title>Title</Title>
                    <Subtitle>Subtitle</Subtitle>
                    <p>Some text</p>
                  </Card>
                </div>
              </div>

              <div className="mx-auto mb-3 w-full min-w-[300px] max-w-[600px]">
                <H2 className="mb-2">Loading Spinner</H2>
                <div className="flex w-full items-center justify-center">
                  <LoadingSpinner />
                </div>
              </div>

              <div className="mx-auto mb-3 w-full min-w-[300px] max-w-[600px]">
                <H2 className="mb-2">Footer</H2>
                <Footer>Footer text</Footer>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
