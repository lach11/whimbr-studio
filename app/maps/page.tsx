import {Page,PageTitle} from "../components";
import {MapBrowser} from "../ContentDiscovery";
import {getPublished} from "../content-db";
export const metadata={title:"Data Maps | Whimbr Studio",description:"Explore Whimbr Studio data maps and the stories behind how they were made."};
export default async function Maps(){const maps=await getPublished("map");return <Page><div className="cr-container cr-page"><PageTitle>Data Maps</PageTitle><p className="cr-intro">Visual explorations that turn public data into useful, understandable stories.</p><MapBrowser items={maps}/></div></Page>}
