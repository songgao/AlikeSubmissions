#!/bin/bash

FILES=(`ls -x *.m`)

LAST=`echo ${#FILES[@]}-1|bc`
FIRST_PRINTED=false
echo [
for i in `seq 0 $LAST`
do
    file_i=${FILES[$i]}
    num_i=`wc -l $file_i | awk '{ print $1 }'`
    START=`echo $i+1|bc`
    for j in `seq $START $LAST`
    do
        file_j=${FILES[$j]}
        num_j=`wc -l $file_j | awk '{ print $1 }'`
        num_lines_different=`diff -bB -I "^ *%" $file_i $file_j | grep "[<>] " | wc -l`
        percent=`echo "scale=4;1-$num_lines_different/($num_i+$num_j)" | bc | awk '{printf "%.4f\n", $0}'`
        if [ "1" -eq `echo "$percent>0.5" | bc` ]
        then
            if $FIRST_PRINTED
            then
                echo , {\"File1\": \"$file_i\", \"File2\": \"$file_j\", \"Alikeness\": $percent}
            else
                echo {\"File1\": \"$file_i\", \"File2\": \"$file_j\", \"Alikeness\": $percent}
                FIRST_PRINTED=true
            fi
        fi
    done
done
echo ]
