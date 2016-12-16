using System;
using System.Configuration;
using System.Net.Http;
using System.Threading.Tasks;
using System.Web.Http;

namespace TC.Proxy
{
    /// <summary>
    /// The controller that does proxy to team-city API service.
    /// </summary>
    /// <seealso cref="System.Web.Http.ApiController" />
    public class TeamcityProxyController : ApiController
    {
        /// <summary>
        /// Proxies all GET request to the team-city API.
        /// </summary>
        /// <returns>The result of the proxy service call.</returns>
        public async Task<HttpResponseMessage> Get()
        {
            var currentHost = Request.RequestUri.Host;
            var tcHost = ConfigurationManager.AppSettings["tcHost"];

            var forwardUri = new UriBuilder(
                Request.RequestUri.AbsoluteUri.Replace(currentHost, tcHost))
            {
                Port = 80
            };

            Request.RequestUri = forwardUri.Uri;
            Request.Content = null;

            var client = new HttpClient();
            return await client.SendAsync(
                Request,
                HttpCompletionOption.ResponseHeadersRead);
        }
    }
}