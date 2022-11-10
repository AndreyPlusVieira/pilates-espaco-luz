using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Flunt.Notifications;
using Microsoft.AspNetCore.Identity;

namespace PilatesAPI.Entities
{
    public static class ProblemDetailsExtensions
    {
        public static Dictionary<string, string[]> ConvertToProblemDetails(this IReadOnlyCollection<Notification> notifications)
        {
            return notifications.GroupBy(x => x.Key).ToDictionary(x => x.Key, x => x.Select(x => x.Message).ToArray());
        }

        public static Dictionary<string, string[]> ConvertToProblemDetails(this IEnumerable<IdentityError> error)
        {
            var dictionary = new Dictionary<string, string[]>();
            dictionary.Add("Error", error.Select(e => e.Description).ToArray());
            return dictionary;
        }
    }
}