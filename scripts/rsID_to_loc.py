#!/usr/env Python

# rsID_to_loc.py
# This Python program takes a file with SNP IDs (rs######) and produces the location, retrieved from 
# the UCSC Genome Browser using CruzDB.  For more info on CruzDB, see here: https://github.com/brentp/cruzdb
#
# Input structure: This takes a tab-separated values list of rsIDs (SNP IDs), such as:
# rs1113396	T	C	0.058	-0.014	0.0063	0.026	230497
#
# Note that the SNP ID should be the first column.  The column containing the p-value can be set below this line.
#
###### CUSTOMIZABLE: COLUMN CONTAINING P-VALUE FOR EACH SNP ######
#
pval_col = 6
#
###### END CUSTOMIZATION ######

import cruzdb, sys

hg19 = cruzdb.Genome('hg19')
snp147 = hg19.snp147

# reading in infile
infile = open(sys.argv[1], "r")
outfile = open(sys.argv[1][:-4] + ".located.txt", "w")

# header
outfile.write("MarkerName\tChromosome\tLocation\tAllele1\tAllele2\tFreq.Allele1.HapMapCEU\tp\n")

line_count = 0
processed_count = 0
error_count = 0
for line in infile:
	line_count += 1
	splitline = line.split("\t")
	if splitline[0][:2] == "rs":
		if float(splitline[pval_col].strip()) > 0.95:
			continue
		else:
			processed_count += 1
			info = snp147.filter_by(name=splitline[0]).first()
			split_info = str(info).split("\t")
			# writing to outfile
			try:
				outfile.write("\t".join([splitline[0], split_info[0], split_info[1], splitline[1], splitline[2], splitline[3], splitline[pval_col]]) + "\n")
			except IndexError:
				print line
				if str(info) == 'None':
					error_count += 1
			if processed_count % 100 == 0:
				print "\t".join([str(line_count), str(processed_count), str(error_count), str(info)])
	else:
		continue

# example
# print snp147.filter_by(name="rs4749917").first()
