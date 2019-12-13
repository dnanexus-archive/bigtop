#!/usr/env Python

# coordinate_setup.py
# Reads in an input file with the following lines:
# GeneName		MarkerName		Chromosome	Location	Allele1	Allele2	Freq.Allele1.HapMapCEU	p
# FRMDB40		rs4747841		chr10		9960128		A		G		0.551					0.70

# We want to convert this first to polar coordinates, and then to Cartesian coordinates.

# imports
import sys, os, math

# describing chromosome lengths and total
chr_names_list = ['chr1', 'chr2', 'chr3', 'chr4', 'chr5', 'chr6', 'chr7', 'chr8', 'chr9', 'chr10', 'chr11', 'chr12', 'chr13', 'chr14', 'chr15', 'chr16', 'chr17', 'chr18', 'chr19', 'chr20', 'chr21', 'chr22', 'chrX', 'chrY']
chr_lengths_list = [248956422, 242193529, 198295559, 190214555, 181538259, 170805979, 159345973, 145138636, 138394717, 133797422, 135086622, 133275309, 114364328, 107043718, 101991189, 90338345, 83257441, 80373285, 58617616, 64444167, 46709983, 50818468, 156040895, 57227415]

total = sum(chr_lengths_list)

# functions
def convert_to_polar(line):
	splitline = line.strip().split("\t")
	chr_num = splitline[2]
	chr_pos = splitline[3]
	allele_freq = splitline[6]
	pval = splitline[7]
	dist_from_genome_start = int(chr_pos)

	if chr_num in chr_names_list:
		position = chr_names_list.index(chr_num)
		while position >= 0:
			position -= 1
			if position >= 0:
				dist_from_genome_start += chr_lengths_list[position]
#			dist_from_genome_start += spacer
	else:
		position = ""
	# reduce to polar (between 0 and 2pi - math.pi)
	sigma = float(dist_from_genome_start) / total * 2 * math.pi - (math.pi / 2)
	# CHANGING THE SCALE TO BE BETWEEN 100-1,000 #
	r = (float(allele_freq) * 900) + 100
	y_polar = float(pval)
	return r, sigma, y_polar

def convert_to_cartesian(r, sigma, y_polar):
	x = r * math.cos(sigma)
	y = -math.log10(y_polar)
	z = r * math.sin(sigma)
	return x, y, z

infile = open(sys.argv[1], "r")
outfile = open(sys.argv[1][:-4] + ".coords.json", "w")

outfile.write("[\n")
for line in infile:
	try:
		if line.split("\t")[0] != "MarkerName":
			if line.split("\t")[1] != "No_info":
				polar_coords = convert_to_polar(line)
				cartesian_coords = convert_to_cartesian(polar_coords[0], polar_coords[1], polar_coords[2])

				split = line.strip().split("\t")
				outfile.write(
					"\t{\n" +
					"\t\t\"id\": \"" + split[1] + "\",\n" +
					"\t\t\"gene\": \"" + split[0] + "\",\n" +
					"\t\t\"coords\": [" + ",".join([
						str(cartesian_coords[0]),
						str(cartesian_coords[1]),
						str(cartesian_coords[2])
					]) + "],\n" +
					"\t\t\"chr\": \"" + split[2] + "\",\n" +
					"\t\t\"location\": " + str(split[3]) + ",\n" +
					"\t\t\"frequency\": " + str(split[6]) + ",\n" +
					"\t\t\"p\": " + str(split[7]) + "\n\t},\n"
				)
	except IndexError:
		print line
		print "Exited with error on above line."
		sys.exit()
outfile.write("]\n")

print "Successfully converted to Cartesian coordinates."
infile.close()
outfile.close()
