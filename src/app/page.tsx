

import ImageFallback from "@/helpers/ImageFallback";
import { getListPage } from "@/lib/contentParser";
import { markdownify } from "@/lib/utils/textConverter";

import SeoMeta from "@/partials/SeoMeta";

import {  Button, Feature } from "@/types";


import {YouTubeLinkDisplay,getRandomYouTubeLink} from "@/lib/videomanagment";
import { ButtonGen } from "@/content/button";
import YouTubePlayer from "@/content/YoutubePlayer";

const Home = () => {
  const homepage = getListPage("homepage/_index.md");


    const { frontmatter } = homepage;
    const {
      banner,
      features
    }: {
      banner: { title: string; image: string; content?: string; button?: Button };
      features: Feature[];
    } = frontmatter;
    // Use banner and features here







  return (
    <>

      <SeoMeta />
      <section className="section ">
        <div className="container">
          <div className="row justify-center">
            <div className="lg:col-7 md:col-9 mb-8 text-center">
              <h1
                className="mb-4 text-h3 lg:text-h1"
                dangerouslySetInnerHTML={markdownify(banner.title)}
              />
              <p
                className="mb-8"
                dangerouslySetInnerHTML={markdownify(banner.content ?? "")}
              />
              {features.map((feature, index: number) => (
        <section
          key={index}
          className={`section-sm ${index % 2 === 0 && "bg-gradient"}`}
        >
          <div className="container">
            <div className="row items-center justify-between">
              <div
                className='flex '
              >

              </div>
              <div

              >
                <h2
                  className="mb-4 font-normal text-lg"
                  dangerouslySetInnerHTML={markdownify(feature.title)}
                />

                <ul>
                  {feature.bulletpoints.map((bullet: string,i) => (
                    <li className="flex gap-2 justify-start items-start text-start" key={bullet}>
                    <p className="">{i+1}.</p>
                      <span dangerouslySetInnerHTML={markdownify(bullet)} />
                    </li>
                  ))}
                </ul>

              </div>
            </div>
          </div>
        </section>
      ))}

            </div>

          </div>
        </div>
        <ButtonGen/>
      </section>




    </>
  );
};

export default Home;
