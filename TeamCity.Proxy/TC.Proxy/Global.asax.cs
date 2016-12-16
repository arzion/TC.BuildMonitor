using System.Web;
using System.Web.Http;
using System.Web.Http.Cors;

namespace TC.Proxy
{
    /// <summary>
    /// The entry point of the application.
    /// </summary>
    /// <seealso cref="System.Web.HttpApplication" />
    public class WebApiApplication : HttpApplication
    {
        /// <summary>
        /// Executes once on the initializing of the application.
        /// </summary>
        protected void Application_Start()
        {
            var config = GlobalConfiguration.Configuration;

            config.EnableCors(new EnableCorsAttribute("*", "*", "*"));

            config.Routes.MapHttpRoute(
                "Proxy",
                "{*path}",
                new { controller = "TeamcityProxy", path = RouteParameter.Optional });
        }
    }
}