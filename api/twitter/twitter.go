package twitter

import (
	"encoding/json"
	"fmt"
	"io/ioutil"
	"sort"

	"net/http"
	"os"
	"strings"
	"unicode"

	"github.com/api/structs"
)

func stringInSlice(a string, list []string) bool {
	for _, b := range list {
		if b == a {
			return true
		}
	}
	return false
}

type wc struct {
	Text  string `json:"text"`
	Value int    `json:"value"`
}

type nc struct {
	Ngram string
	Count int
}

func wordCount(str string) []wc {
	wordList := strings.Fields(str)
	counts := make(map[string]int)
	stopWords := []string{"&AMP;", "A", "ABOUT", "ACTUALLY", "ALMOST", "ALSO", "ALTHOUGH", "ALWAYS", "AM", "AN", "AND", "ANY", "ARE", "AS", "AT",
		"BE",
		"BECAME", "BECOME", "BUT", "BY", "CAN", "COULD", "DID", "DO", "DOES", "EACH", "EITHER", "ELSE", "FOR", "FROM", "GET", "GOT", "HAD", "HAS",
		"HAVE", "HENCE", "HOW", "I", "IF", "IN", "IS", "IT", "ITS", "JUST", "LIKE", "MAY", "MAYBE", "ME", "MIGHT", "MINE", "MUST", "MY", "MINE",
		"MUST", "MY", "NEITHER", "NOR", "NOT", "OF", "OH", "OK", "ON", "OR", "SO", "THAT", "THE", "TO", "THEN", "THERE", "THEY", "THIS", "THOSE",
		"WAS",
		"WERE", "WHAT",
		"WHEN", "WHERE",
		"WHEREAS", "WHEREVER", "WHENEVER", "WHETHER", "WHICH", "WHILE", "WHO", "WHOM", "WHOEVER", "WHOSE", "WHY", "WILL", "WITH", "WITHIN",
		"WITHOUT", "WOULD", "YES", "YET", "YOU", "YOUR"}
	for _, word := range wordList {
		if !stringInSlice(strings.ToUpper(word), stopWords) {
			_, ok := counts[word]
			if ok {
				counts[word] += 1
			} else {
				counts[word] = 1
			}
		}
	}

	var ss []wc
	for k, v := range counts {
		ss = append(ss, wc{k, v})
	}

	sort.Slice(ss, func(i, j int) bool {
		return ss[i].Value > ss[j].Value
	})

	if len(ss) > 50 {
		return ss[:50]
	}

	return ss
}

// SplitOnNonLetters and ngram functions provided by Xeoncross/ngrams.go; Thank you!!
func SplitOnNonLetters(s string) []string {
	notALetter := func(char rune) bool { return !unicode.IsLetter(char) }
	return strings.FieldsFunc(s, notALetter)
}

func ngrams(words []string, size int) []nc {

	count := make(map[string]int)
	offset := int(float64(size / 2))

	max := len(words)
	for i := range words {
		if i < offset || i+size-offset > max {
			continue
		}
		gram := strings.Join(words[i-offset:i+size-offset], " ")
		count[gram]++
	}

	// return count
	var ss []nc
	for k, v := range count {
		ss = append(ss, nc{k, v})
	}

	sort.Slice(ss, func(i, j int) bool {
		return ss[i].Count > ss[j].Count
	})

	if len(ss) > 50 {
		return ss[:50]
	}

	return ss
}

func getTweet(url string) (t structs.TwitterData) {

	client := &http.Client{}

	var twitter structs.TwitterData

	req, err := http.NewRequest("GET", url, nil)
	if err != nil {
		fmt.Println("error: ", err)
	}

	bearerToken := os.Getenv("TWITTER_BEARER_TOKEN")
	bearer := "Bearer " + bearerToken
	req.Header.Add("Authorization", bearer)

	resp, err := client.Do(req)
	if err != nil {
		fmt.Println("Error while making the request:", err)
	}
	defer resp.Body.Close()

	body, err := ioutil.ReadAll(resp.Body)
	if err != nil {
		fmt.Println("Error while reading the response bytes:", err)
	}

	err = json.Unmarshal(body, &twitter)
	if err != nil {
		fmt.Println("Error during json unmarshall: ", err)
	}

	return twitter
}

type Request struct {
	Query string `json:"query,omitempty"`
}

func Twitter(w http.ResponseWriter, r *http.Request) {

	var newRequest Request
	reqBody, err := ioutil.ReadAll(r.Body)
	if err != nil {
		fmt.Fprintf(w, "Enter product data")
	}

	json.Unmarshal(reqBody, &newRequest)

	fmt.Println("NEW REQUEST IN API: ", newRequest)

	var allResponses []structs.TwitterData

	t := getTweet("https://api.twitter.com/2/tweets/search/recent?query=" + newRequest.Query + "&max_results=100")

	allResponses = append(allResponses, t)

	if len(t.Meta.NextToken) > 0 {
		// fmt.Println("NEXT TOKEN t FOUND", t.Meta.NextToken)
		tw := getTweet("https://api.twitter.com/2/tweets/search/recent?query=puppies&next_token=" + t.Meta.NextToken)
		allResponses = append(allResponses, tw)

		if len(tw.Meta.NextToken) > 0 {
			// fmt.Println("NEXT TOKEN tw FOUND", tw.Meta.NextToken)
			twe := getTweet("https://api.twitter.com/2/tweets/search/recent?query=puppies&next_token=" + tw.Meta.NextToken)
			allResponses = append(allResponses, twe)

			if len(twe.Meta.NextToken) > 0 {
				// fmt.Println("NEXT TOKEN twe FOUND", twe.Meta.NextToken)
				twee := getTweet("https://api.twitter.com/2/tweets/search/recent?query=puppies&next_token=" + twe.Meta.NextToken)
				allResponses = append(allResponses, twee)

				if len(twee.Meta.NextToken) > 0 {
					// fmt.Println("NEXT TOKEN twee FOUND", twee.Meta.NextToken)
					tweet := getTweet("https://api.twitter.com/2/tweets/search/recent?query=puppies&next_token=" + twee.Meta.NextToken)
					allResponses = append(allResponses, tweet)

					if len(tweet.Meta.NextToken) > 0 {
						// fmt.Println("NEXT TOKEN tweet FOUND", tweet.Meta.NextToken)
						tweetDone := getTweet("https://api.twitter.com/2/tweets/search/recent?query=puppies&next_token=" + tweet.Meta.NextToken)
						allResponses = append(allResponses, tweetDone)
					}
				}
			}
		}
	}

	var tweetText []string

	for _, tweet := range allResponses {
		for _, v := range tweet.Data {
			tweetText = append(tweetText, v.Text)
		}
	}

	strLine := strings.Join(tweetText, ",")
	str := strings.ToLower(strLine)
	parts := SplitOnNonLetters(str)

	type WordResults struct {
		WordCount []wc
		Bigrams   []nc
		Trigrams  []nc
	}

	var wr WordResults
	wr.WordCount = wordCount(strLine)
	wr.Bigrams = ngrams(parts, 2)
	wr.Trigrams = ngrams(parts, 3)

	//Allow CORS here By * or specific origin
	w.Header().Set("Access-Control-Allow-Origin", "*")
	w.Header().Set("Access-Control-Allow-Headers", "Content-Type")
	json.NewEncoder(w).Encode(wr)

}

// HomeLink establishes a quick endpoint testing function
func HomeLink(w http.ResponseWriter, r *http.Request) {
	fmt.Fprintf(w, "Welcome home!")
}
