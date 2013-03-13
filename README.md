# AlikeSubmissions

Check out a demo page [here](http://songgao.github.com/AlikeSubmissions) (Names are masked).

I'm a TA for MATLAB class taken about 400 students. I used these scripts to analize students' submissions to their Lab assignments and find out alike ones.

## Usage

Use `find_alike.sh` to find out submissions in the current directory that are alike from each other. The one in this repo looks at MATLAB scripts and only prints those with more than 50% same lines. Modify it if you are working on other languages or looking at submissions in sub-directories.

```bash
# cd to the directory containing all submissions
$ /path/to/find_alike.sh | tee alike_ones.json
```

Copy alike_ones.json to the same directory.

Mask names if you like
```bash
$ cat alike_ones.json | mask_names.py | tee alike_ones_masked.json
```

Open up a local server and see the result from `localhost:8080`
```bash
$ python -m SimpleHTTPServer 8080
```
