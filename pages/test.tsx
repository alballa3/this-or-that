import { useTranslations } from "next-intl"
import {GetStaticPropsContext} from 'next';

export default function Test() {
    const t = useTranslations("homePage")
    console.log(t("title"))
    return (
        <div>
            <h1>Test</h1>
            <p>Test</p>
        </div>
    )
}
export async function getStaticProps({locale}: GetStaticPropsContext) {
    return {
      props: {
        messages: (await import(`../messages/${locale}.json`)).default
      }
    };
  }