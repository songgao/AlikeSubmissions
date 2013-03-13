#!/usr/bin/env python2.7

import json
import sys

data = json.load(sys.stdin)

counter = 0
names = {}

for item in data:
    if item["File1"] not in names:
        names[item["File1"]] = "submission " + str(counter)
        counter = counter + 1
    if item["File2"] not in names:
        names[item["File2"]] = "submission " + str(counter)
        counter = counter + 1
    item["File1"] = names[item["File1"]]
    item["File2"] = names[item["File2"]]

json.dump(data, sys.stdout)
