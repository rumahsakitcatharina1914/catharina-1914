import { Clock, Award, Stethoscope, Calendar, User } from 'lucide-react';
import Image from 'next/image';



export default function DoctorCard({ doctor }) {
  return (
    <div className="group relative h-full animate-fade-in-up">
      <div className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-300 border border-border hover:border-secondary/50 h-full flex flex-col transform hover:scale-105 hover:-translate-y-2">
        
        {/* Foto Dokter */}
        <div className="relative w-full aspect-[3/4] overflow-hidden bg-gradient-to-br from-primary/5 to-secondary/5">
          {doctor?.image ? (
            <Image
              src={doctor.image}
              alt={doctor.name}
              fill
               sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              className="object-cover object-top"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center">
              <User className="text-primary/30" size={80} />
            </div>
          )}

          {/* Overlay gradient */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
        </div>

        {/* Info Dokter */}
        <div className="p-5">
          <h3 className="text-xl font-serif font-bold text-foreground mb-2 group-hover:text-primary transition-colors">
            {doctor?.name}
          </h3>

          <p className="text-sm text-primary font-semibold mb-3">
            {doctor?.specialization}
          </p>

          {/* Jadwal Praktik */}
          {doctor?.schedule && doctor.schedule.length > 0 && (
            <div className="bg-neutral-light rounded-xl p-4 border border-border">
              <p className="text-xs font-bold text-foreground/70 mb-3 flex items-center gap-2">
                <Calendar size={14} />
                Jadwal Praktik
              </p>

              <div className="space-y-2">
                {doctor.schedule.map((sched, idx) => (
                  <div
                    key={idx}
                    className="flex items-center justify-between text-sm"
                  >
                    <span className="text-foreground font-medium">
                      {sched.day}
                    </span>

                    <span className="flex items-center gap-1 text-primary font-semibold">
                      <Clock size={14} />
                      {sched.time}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
} 