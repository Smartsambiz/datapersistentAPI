const COUNTRY_MAP = {
    nigeria: 'NG', ghana: 'GH', kenya: 'KE', angola: 'AO',
  benin: 'BJ', cameroon: 'CM', senegal: 'SN', ethiopia: 'ET',
  tanzania: 'TZ', uganda: 'UG', rwanda: 'RW', mali: 'ML',
  'south africa': 'ZA', egypt: 'EG', morocco: 'MA', togo: 'TG',
  niger: 'NE', chad: 'TD', somalia: 'SO', sudan: 'SD',
  zambia: 'ZM', zimbabwe: 'ZW', mozambique: 'MZ', malawi: 'MW',
  namibia: 'NA', botswana: 'BW', gabon: 'GA', congo: 'CG',
  'dr congo': 'CD', 'democratic republic of congo': 'CD',
  madagascar: 'MG', eritrea: 'ER', gambia: 'GM', liberia: 'LR',
  'sierra leone': 'SL', guinea: 'GN', tunisia: 'TN', algeria: 'DZ',
  libya: 'LY', 'ivory coast': 'CI', "cote d'ivoire": 'CI',
  burkina: 'BF', 'burkina faso': 'BF', burundi: 'BI',
  'cape verde': 'CV', comoros: 'KM', djibouti: 'DJ',
  'equatorial guinea': 'GQ', 'guinea bissau': 'GW',
  lesotho: 'LS', mauritania: 'MR', mauritius: 'MU',
  'sao tome': 'ST', seychelles: 'SC', swaziland: 'SZ', eswatini: 'SZ',
}

function parseNLQuery(q){
    if(!q || !q.trim()) return null
    
    const query = q.toLowerCase().trim();
    const filters = {}
    let matched = false;

    // Gender 
    const hasMale = /\bmales?\b/.test(query);
    const hasFemale = /\bfemales?\b/.test(query);

    if (hasMale && !hasFemale){
        filters.gender = 'male';
        matched = true;
    } else if( hasFemale && !hasMale){
        filters.gender = 'female';
        matched = true;
    } else if(hasMale & hasFemale){
        // both mentioned, no gender but its a valid query
        matched = true;
    } else if(/\b(people|persons?|individuals?|humans?)\b/.test(query)){
        matched = true
    }

    // Age Keywords

    if(/\byoung\b/.test(query)){
        filters.min_age = 16;
        filters.max_age = 24;
        matched = true;
    }

    // AGE GROUPS
    const ageGroupMap = {
        child: 'child', children: 'child',
        teenager: 'teenager', teenagers: 'teenager', teen: 'teenager',
        adult: 'adult', adults: 'adult',
        senior: 'senior', seniors: 'senior', elderly: 'senior', elder: 'senior',
    };

    for(const [keyword, group] of Object.entries(ageGroupMap)){
        if(new RegExp(`\\b${keyword}\\b`).test(query)){
            filters.age_group = group;
            matched = true;
            break
        }
    }

    // MIN AGE: "above X", "over X", "greater than X", "older than X"
    const minAgeMatch = query.match(/\b(?:above|over|older than|greater than|at least|minimum age of?)\s+(\d+)/);
    if(minAgeMatch){
        filters.min_age = parseInt(minAgeMatch[1]);
        matched = true;
    }


    // MAX AGE: "below X", "under X", "Younger than X", "less than X", 
    const maxAgeMatch = query.match(/\b(?:below|under|younger than|less than|at most|maximum age of?)\s+(d+)/);
    if(maxAgeMatch){
        filters.max_age = parseInt(maxAgeMatch[1]);
        matched = true
    }

    // EXACT AGE: "aged X", "age X"
    const exactAgeMatch = query.match(/\bage[d]?\s+(\d+)\b/);
    if(exactAgeMatch){
        filters.min_age = parseInt(exactAgeMatch[1]);
        filters.max_age = parseInt(exactAgeMatch[1]);
    }

    // COUNTRY: "from X"
    // Try multi-word countries first then single word
    const fromMatch = query.match(/\bfrom\s+([a-z][a-z\s']+?)(?:\s+(?:who|that|with|above|below|aged|lover|under|and|,)|$)/);
    if(fromMatch){
        const raw = fromMatch[1].trim();
        // Try longes march first
        const sorted = Object.keys(COUNTRY_MAP).sort((a, b)=> b.length - a.length);
        for (const country of sorted){
            if(raw.includes(country)){
                filters.country_id = COUNTRY_MAP[country]
                matched = true;
                break;
            }
        }
    }

    if(!matched || Object.keys(filters).length === 0) return null;

    return filters;

}

module.exports = {parseNLQuery};