#!/usr/bin/Python

# loc_to_gene.py
# Purpose: Takes the output of rsID_to_loc.py, which contains the chromosome and coordinates of each SNP, and 
# again uses cruzdb to find which gene(s), if any, are at that location.

import sys, cruzdb, time

t0 = time.clock()

hg19 = cruzdb.Genome('hg19')
snp147 = hg19.snp147

# reading in infile
infile = open(sys.argv[1], "r")
outfile = open(sys.argv[1][:-12] + ".gene_loc.txt", "w")

# header
outfile.write("MarkerName\tChromosome\tLocation\tAllele1\tAllele2\tFreq.Allele1.HapMapCEU\tp\n")

# counters
line_count = 0
processed_count = 0
error_count = 0

# parsing
for line in infile:
	line_count += 1
	splitline = line.split("\t")
	if splitline[0][:2] == "rs":
		if float(splitline[6].strip()) > 0.95:
			continue
		else:
			processed_count += 1
			chrom = line.split("\t")[1]
			if line.split("\t")[1] == "No_info":		# No chromosome location info available
				continue
			else:
				start = int(line.split("\t")[2])
				end = start + 1
				genes = hg19.bin_query('refGene', chrom, start, end)
				if len(set(g.name2 for g in genes)) == 0:
					outfile.write("INTERGENIC\t" + line)
				else:
					outfile.write("\t".join(["|".join(set(g.name2 for g in genes))] + line.split("\t")))
	# line counter return
	if line_count % 1000 == 0:
		print "Lines processed:\t", str(line_count)

print "All done"
t1 = time.clock()
print "Time elapsed:\t", str(t1-t0), " seconds."

infile.close()
outfile.close()
