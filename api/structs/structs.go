package structs

type TwitterData struct {
	Data []Tweet `json:"data"`
	Meta Meta    `json:"meta"`
}

// type Tweets struct {
// 	Tweet []Tweet
// }

type Tweet struct {
	Id   string `json:"id"`
	Text string `json:"text"`
}

type Meta struct {
	NewestID    string `json:"newest_id"`
	OldestID    string `json:"oldest_id"`
	NextToken   string `json:"next_token"`
	ResultCount int    `json:"result_count"`
}
